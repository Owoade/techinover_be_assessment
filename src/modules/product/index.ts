import { Module } from "@nestjs/common";
import { ProductModelProvider } from "./model";
import { ProductRepository } from "./repo";
import { ProductController } from "./controller";
import { ProductService } from "./service";

@Module({
  providers: [ProductModelProvider, ProductRepository, ProductService],
  controllers: [ProductController],
  exports: [ProductRepository, ProductService]
})
export class ProductModule {}