package manh.com.service.Impl;

import java.text.Normalizer;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import manh.com.converter.ProductConverter;
import manh.com.dto.ProductDTO;
import manh.com.entity.ProductEntity;
import manh.com.repository.ProductRepository;
import manh.com.service.IProductService;

@Service
public class ProductService implements IProductService {

	@Autowired
	public ProductRepository productRepository;
	@Autowired
	public ProductConverter productConverter;

	@Override // update hoặc add sản phẩm
	public ProductDTO save(ProductDTO dto) {
		ProductEntity entity = new ProductEntity();
		if (dto.getId() != null) {
			ProductEntity oldEntity = productRepository.findOne(dto.getId());
			entity = productConverter.toEntity(dto, oldEntity);
		} else {
			entity = productConverter.toEntity(dto);
		}
		entity = productRepository.save(entity);
		return productConverter.toDTO(entity);

	}

	@Override
	public void delete(long id) {
		productRepository.delete(id);

	}

	@Override // get toàn bộ sản phẩm theo type
	public List<ProductDTO> findProductsByType(String type) {
		System.out.print(type);
		List<ProductDTO> results = new ArrayList<>();
		List<ProductEntity> entities = productRepository.findAll();
		for (ProductEntity item : entities) {
			if (covertToString(item.getType()).contains(type)) {
				ProductDTO dto = productConverter.toDTO(item);
				results.add(dto);
			}
		}
		return results;
	}

	@Override // get sản phẩm với phân trang
	public List<ProductDTO> findAll(Pageable pageable) {
		List<ProductDTO> results = new ArrayList<>();
		List<ProductEntity> entities = productRepository.findAll(pageable).getContent();
		for (ProductEntity item : entities) {
			ProductDTO dto = productConverter.toDTO(item);
			results.add(dto);
		}
		return results;
	}

	@Override // get sản phẩm với Name
	public List<ProductDTO> findByName(String name) {
		System.out.print(name);
		name = covertToString(name);
		List<ProductDTO> results = new ArrayList<>();
		List<ProductEntity> entities = productRepository.findAll();
		for (ProductEntity item : entities) {
			{
				if (covertToString(item.getName()).toLowerCase().contains(name.toLowerCase())
						|| covertToString(item.getType()).toLowerCase().contains(name.toLowerCase())
						|| (item.getSub() != null
								&& covertToString(item.getSub()).toLowerCase().contains(name.toLowerCase()))) {
					ProductDTO dto = productConverter.toDTO(item);
					results.add(dto);
				}
			}
		}
		return results;
	}

	@Override // get sản phẩm với id
	public ProductDTO findOneById(Long id) {
		ProductDTO productDTO = new ProductDTO();
		ProductEntity productEntity = productRepository.getOne(id);
		productDTO = productConverter.toDTO(productEntity);
		return productDTO;

	}

	@Override // get toàn bộ sản phẩm
	public List<ProductDTO> getAll() {
		List<ProductDTO> results = new ArrayList<>();
		List<ProductEntity> entities = productRepository.findAll();
		for (ProductEntity item : entities) {
			ProductDTO dto = productConverter.toDTO(item);
			results.add(dto);
		}
		return results;

	}

	@Override // sử dụng với phân trang
	public int totalItem() {

		return (int) productRepository.count();
	}

	public static String covertToString(String value) {
		try {
			String temp = Normalizer.normalize(value, Normalizer.Form.NFD);
			Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
			return pattern.matcher(temp).replaceAll("");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return null;
	}
}
