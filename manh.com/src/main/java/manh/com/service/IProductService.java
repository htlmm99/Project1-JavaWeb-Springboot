package manh.com.service;

import java.util.List;

import org.springframework.data.domain.Pageable;

import manh.com.dto.ProductDTO;

public interface IProductService {
	ProductDTO save(ProductDTO productDTO);

	void delete(long id);

	List<ProductDTO> findAll(Pageable pageable);

	List<ProductDTO> getAll();

	int totalItem();

	List<ProductDTO> findByName(String name);

	ProductDTO findOneById(Long id);

	List<ProductDTO> findProductsByType(String type);
}
