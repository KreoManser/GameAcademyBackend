import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';
import { getJwtConfig } from './configs/jwt.config';
import { getRMQConfig } from './configs/rmq.config';
import { AuthContoller } from './controllers/auth.controller';
<<<<<<< HEAD
import { UserContoller } from './controllers/user.controller';
=======
import { ProjectController } from './controllers/project.controller';
import { UserContoller } from './controllers/user.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
>>>>>>> 621d7fe (Added new endpoints and microservices + mocks objects)

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: 'envs/.api.env', isGlobal: true }),
<<<<<<< HEAD
=======
    PassportModule.register({ defaultStrategy: 'jwt' }),
>>>>>>> 621d7fe (Added new endpoints and microservices + mocks objects)
    RMQModule.forRootAsync(getRMQConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule,
  ],
<<<<<<< HEAD
  controllers: [AuthContoller, UserContoller],
=======
  controllers: [AuthContoller, UserContoller, ProjectController],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule],
>>>>>>> 621d7fe (Added new endpoints and microservices + mocks objects)
})
export class AppModule {}
