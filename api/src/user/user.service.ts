import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PasswordService } from 'src/security/password/password.service';

@Injectable()
export class UserService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly passwordService: PasswordService;

  async createUser(user: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await this.passwordService.hash(user.password);
    try {
      return await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email já existe');
      }
      throw error;
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      where,
      data,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getUser(where: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
    });
  }
}
