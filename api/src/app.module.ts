import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { PasswordService } from './security/password/password.service';
import { PasswordModule } from './security/password/password.module';

@Module({
  imports: [HelloModule, AuthModule, UserModule, PrismaModule, PasswordModule],
  providers: [PrismaService, PasswordService],
})
export class AppModule {}
