import { UsuarioRepository } from './usuario.repository';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsuarioService {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    try {
      usuarioEntity.email = dadosDoUsuario.email;
      usuarioEntity.senha = dadosDoUsuario.senha;
      usuarioEntity.nome = dadosDoUsuario.nome;
      usuarioEntity.id = uuid();

      this.usuarioRepository.salvar(usuarioEntity);
      return {
        usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
        messagem: 'Usuário criado com sucesso',
      };
    } catch (error) {
        throw new BadRequestException("Erro ao criar usuário!");
    }
  }

  async listUsuarios() {
    try {
        const usuariosSalvos = await this.usuarioRepository.listar();
        return usuariosSalvos.map((usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome));
    } catch (error) {
        throw new BadRequestException("Erro ao listar usuários!");
    }
  }

  async atualizaUsuario(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) {
      const existeUsuario = await this.usuarioRepository.buscaPorId(id);
      if (!existeUsuario) {
          throw new NotFoundException("Usuário não encontrado")
      }
      try {
        const usuarioAtualizado = await this.usuarioRepository.atualiza(id, dadosDeAtualizacao);
        return {
            usuario: usuarioAtualizado,
            menssagem: 'Usuário atualizado com sucesso',
          };
    } catch (error) {
      throw new BadRequestException("Erro ao atualiza usuário");      
    }
  }

  async removeUsuario( id: string) {
    const existeUsuario = await this.usuarioRepository.buscaPorId(id);
    if (!existeUsuario) {
        throw new NotFoundException("Usuário não encontrado")
    }
    try {
        const usuarioRemovido = await this.usuarioRepository.remove(id);
        return {
        usuario: usuarioRemovido,
        messagem: 'Usuário removido com suceso',
        };
    } catch (error) {
      throw new BadRequestException("Erro ao excluir usuário");    
    }
  }
}