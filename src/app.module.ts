import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';
import { IdentityModule } from './identity/identity.module';
import { TestModule } from './test/test.module';
import { UsersModule } from './users/users.module';
import { SnippetsModule } from './snippets/snippets.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AuthModule,
    IdentityModule,
    TestModule,
    UsersModule,
    SnippetsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
