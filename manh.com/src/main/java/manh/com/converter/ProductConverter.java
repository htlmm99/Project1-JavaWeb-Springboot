package manh.com.converter;

import org.springframework.stereotype.Component;

import manh.com.dto.ProductDTO;
import manh.com.entity.ProductEntity;

@Component
public class ProductConverter {
	
	public ProductEntity toEntity(ProductDTO productDTO)
	{
		ProductEntity productEntity = new ProductEntity();
		productEntity.setName(productDTO.getName());
		productEntity.setType(productDTO.getType());
		productEntity.setImg(productDTO.getImg());
		productEntity.setSub(productDTO.getSub());
		productEntity.setPrice(productDTO.getPrice());
		productEntity.setAmount(productDTO.getAmount());
		return productEntity;
	}
	
	public ProductEntity toEntity(ProductDTO productDTO, ProductEntity productEntity)
	{
		productEntity.setName(productDTO.getName());
		productEntity.setType(productDTO.getType());
		productEntity.setImg(productDTO.getImg());
		productEntity.setSub(productDTO.getSub());
		productEntity.setPrice(productDTO.getPrice());
		productEntity.setAmount(productDTO.getAmount());
		return productEntity;
	}
	
	public ProductDTO toDTO(ProductEntity productEntity)
	{
		ProductDTO productDTO = new ProductDTO();
		if(productEntity.getId() != null)
		{
			productDTO.setId(productEntity.getId());
		}
		productDTO.setName(productEntity.getName());
		productDTO.setType(productEntity.getType());
		productDTO.setImg(productEntity.getImg());
		productDTO.setSub(productEntity.getSub());
		productDTO.setPrice(productEntity.getPrice());
		productDTO.setAmount(productEntity.getAmount());
		productDTO.setCreatedDate(productEntity.getCreatedDate());
		productDTO.setModifiedDate(productEntity.getModifiedDate());
		return productDTO;
	}
}
