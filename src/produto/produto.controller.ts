import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    try {
      return this.produtoService.criaNovo(dadosProduto);
    } catch (error) {
      throw new BadRequestException("Erro ao criar produto");
    }
  }

  @Get()
  async listaTodos(@Query('pagina') pagina: string, @Query('limite') limite: string) {
    try {
      if (pagina && limite) {
        const numeroPagina = parseInt(pagina, 10);
        const numeroLimite = parseInt(limite, 10);
        return this.produtoService.getProdutosPaginados(numeroPagina, numeroLimite);
      }
      return this.produtoService.listaTodos();
    } catch (error) {
      throw new BadRequestException("Erro ao listar produtos");
    }
  }
  

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() dadosProduto: AtualizaProdutoDTO) {
    try {
      return await this.produtoService.atualiza(id, dadosProduto);
    } catch (error) {
      throw new BadRequestException("Erro ao atualizar produto");
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.produtoService.remove(id);
    } catch (error) {
      throw new BadRequestException("Erro ao excluir produto");
    }
  }
  
}
