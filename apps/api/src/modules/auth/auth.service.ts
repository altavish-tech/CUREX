import { prisma } from '../../config/database';
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  JWTPayload,
} from '../../utils/auth';
import { AuthenticationError, ConflictError } from '../../utils/errors';
import { logger } from '../../utils/logger';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  role: 'PATIENT' | 'DOCTOR' | 'NURSE' | 'ADMIN';
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: 'MALE' | 'FEMALE' | 'OTHER' | 'PREFER_NOT_TO_SAY';
  hospitalId?: string; // Required for DOCTOR, NURSE, ADMIN
  qualification?: string; // For DOCTOR
  specialization?: string; // For DOCTOR
  licenseNumber?: string; // For DOCTOR, NURSE
  designation?: string; // For NURSE
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
    profile?: unknown;
  };
}

export class AuthService {
  async login(input: LoginInput, ipAddress?: string, userAgent?: string): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: {
        patient: true,
        doctor: true,
        nurse: true,
        admin: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('Invalid credentials');
    }

    if (!user.isActive) {
      throw new AuthenticationError('Account is inactive');
    }

    const isValidPassword = await comparePassword(input.password, user.password);
    if (!isValidPassword) {
      throw new AuthenticationError('Invalid credentials');
    }

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    // Create session
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.session.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt,
        ipAddress,
        userAgent,
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'LOGIN',
        ipAddress,
        userAgent,
      },
    });

    logger.info(`User logged in: ${user.email}`);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.patient || user.doctor || user.nurse || user.admin,
      },
    };
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: input.email },
    });

    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(input.password);

    // Create user with profile based on role
    const userData: any = {
      email: input.email,
      password: hashedPassword,
      role: input.role,
    };

    if (input.role === 'PATIENT') {
      userData.patient = {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          phone: input.phone || '',
          dateOfBirth: input.dateOfBirth || new Date('2000-01-01'),
          gender: input.gender || 'PREFER_NOT_TO_SAY',
        },
      };
    } else if (input.role === 'DOCTOR' && input.hospitalId) {
      userData.doctor = {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          qualification: input.qualification || 'MD',
          specialization: input.specialization || 'General Medicine',
          licenseNumber: input.licenseNumber || `DOC-${Date.now()}`,
          hospitalId: input.hospitalId,
        },
      };
    } else if (input.role === 'NURSE' && input.hospitalId) {
      userData.nurse = {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          designation: input.designation || 'Staff Nurse',
          licenseNumber: input.licenseNumber || `NUR-${Date.now()}`,
          hospitalId: input.hospitalId,
        },
      };
    } else if (input.role === 'ADMIN' && input.hospitalId) {
      userData.admin = {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          role: 'ADMIN',
          hospitalId: input.hospitalId,
        },
      };
    }

    const user = await prisma.user.create({
      data: userData,
      include: {
        patient: true,
        doctor: true,
        nurse: true,
        admin: true,
      },
    });

    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    logger.info(`User registered: ${user.email}`);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        profile: user.patient || user.doctor || user.nurse || user.admin,
      },
    };
  }

  async logout(userId: string, refreshToken: string): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        userId,
        token: refreshToken,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'LOGOUT',
      },
    });

    logger.info(`User logged out: ${userId}`);
  }

  async getCurrentUser(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true,
        doctor: true,
        nurse: true,
        admin: true,
      },
    });

    if (!user) {
      throw new AuthenticationError('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      profile: user.patient || user.doctor || user.nurse || user.admin,
    };
  }
}
