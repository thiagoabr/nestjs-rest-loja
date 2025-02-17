import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
      const usuarioEntity = new UsuarioEntity();
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.id = uuid();
      try {
        return this.usuarioService.criaUsuario(usuarioEntity);
      } catch (error) {
        throw new BadRequestException("Erro ao criar usuário");
      }
  }

  @Get()
  async listUsuarios() {
    try {
      return await this.usuarioService.listUsuarios();
    } catch (error) {
      throw new BadRequestException("Erro ao listar usuários");
    }
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    try {
        return await this.usuarioService.atualizaUsuario(id, novosDados);
    } catch (error) {
      throw new BadRequestException("Erro ao atualiza usuário");      
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      return await this.usuarioService.removeUsuario(id);
    } catch (error) {
      throw new BadRequestException("Erro ao excluir usuário");    
    }
  }

}
