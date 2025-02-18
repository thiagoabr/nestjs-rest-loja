import { BadRequestException, Injectable } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { ProdutoEntity } from "./produto.entity";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/atualizaProduto.dto";

@Injectable()
export class ProdutoService {
    constructor(private produtoRepository: ProdutoRepository) {}

    async criaNovo(produtos: ProdutoEntity) {
        try {
            this.produtoRepository.salva(produtos);
            return {
                produto: new ListaProdutoDTO(produtos.id, produtos.usuarioId, produtos.nome),
                messagem: 'Produto criado com sucesso',
            };
        } catch (error) {
            throw new BadRequestException("Erro ao criar produto!");
        }
    }
        
    async listaTodos() {
        return this.produtoRepository.listaTodos();
    }

    async getProdutosPaginados(page: number = 1, limit: number = 5) {
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const produtos = this.produtoRepository.listaTodos();
        const produtosPaginados = produtos.slice(startIndex, endIndex);
    
        return {
          total: produtos.length,
          page,
          limit,
          data: produtosPaginados,
        };
      }

    async atualiza(id: string, dadosProduto: AtualizaProdutoDTO) {
        try {
            const produtoAlterado = await this.produtoRepository.atualiza(id,dadosProduto);
            return {
                mensagem: 'produto atualizado com sucesso',
                produto: produtoAlterado,
            };
        } catch (error) {
            throw new BadRequestException("Erro ao atualizar produto!");

        }
    }

    async remove(id: string) {
        try {
            const produtoRemovido = await this.produtoRepository.remove(id);
            return {
            mensagem: 'Produto removido com sucesso',
            produto: produtoRemovido,
            };            
        } catch (error) {
            throw new BadRequestException("Erro ao excluir produto!");
        }
    }

}