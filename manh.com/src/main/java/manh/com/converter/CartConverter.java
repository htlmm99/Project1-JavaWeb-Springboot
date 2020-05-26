package manh.com.converter;

import org.springframework.stereotype.Component;

import manh.com.dto.CartDTO;
import manh.com.entity.CartEntity;

@Component
public class CartConverter {
	public CartEntity toEntity(CartDTO cartDTO) {
		CartEntity cartEntity = new CartEntity();
		cartEntity.setAmount(cartDTO.getAmount());
		cartEntity.setTotal(cartDTO.getTotal());
		return cartEntity;
	}

	public CartEntity toEntity(CartDTO cartDTO, CartEntity cartEntity) {
		cartEntity.setAmount(cartDTO.getAmount());
		cartEntity.setTotal(cartDTO.getTotal());
		return cartEntity;
	}

	public CartDTO toDTO(CartEntity cartEntity) {
		CartDTO cartDTO = new CartDTO();
		if (cartEntity.getId() != null) {
			cartDTO.setId(cartEntity.getId());
		}
		cartDTO.setTotal(cartEntity.getTotal());
		cartDTO.setAmount(cartEntity.getAmount());
		cartDTO.setBill_id(cartEntity.getBill().getId());
		cartDTO.setProduct_id(cartEntity.getProduct().getId());
		return cartDTO;
	}
}
