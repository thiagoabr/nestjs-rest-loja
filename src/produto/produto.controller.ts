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
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;
  
    try {
      return this.produtoService.criaNovo(produto);
    } catch (error) {
      throw new BadRequestException("Erro ao criar produto");
    }
  }

  @Get()
  async listaTodos(@Query('page') page: string, @Query('limit') limit: string) {
    try {
      if (page && limit) {
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        return this.produtoService.getProdutosPaginados(pageNumber, limitNumber);
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
