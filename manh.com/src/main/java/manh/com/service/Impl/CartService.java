package manh.com.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import manh.com.converter.CartConverter;
import manh.com.dto.CartDTO;
import manh.com.entity.BillEntity;
import manh.com.entity.CartEntity;
import manh.com.entity.ProductEntity;
import manh.com.repository.BillRepository;
import manh.com.repository.CartRepository;
import manh.com.repository.ProductRepository;
import manh.com.service.ICartService;

@Service
public class CartService implements ICartService {
	@Autowired
	public ProductRepository productRepository;
	@Autowired
	public CartRepository cartRepository;
	@Autowired
	public BillRepository billRepository;
	@Autowired
	public CartConverter cartConverter;

	@Override
	public List<CartDTO> getAll() {
		List<CartDTO> results = new ArrayList<>();
		List<CartEntity> entities = cartRepository.findAll();
		for (CartEntity item : entities) {
			CartDTO dto = cartConverter.toDTO(item);
			results.add(dto);
		}
		return results;

	}

	@Override
	public CartDTO getOneById(Long id) {
		CartDTO cartDTO = new CartDTO();
		CartEntity cartEntity = cartRepository.getOne(id);
		cartDTO = cartConverter.toDTO(cartEntity);
		return cartDTO;

	}

	@Override
	public List<CartDTO> findAll(Pageable pageable) {
		List<CartDTO> results = new ArrayList<>();
		List<CartEntity> entities = cartRepository.findAll(pageable).getContent();
		for (CartEntity item : entities) {
			CartDTO dto = cartConverter.toDTO(item);
			results.add(dto);
		}
		return results;
	}

	@Override
	public List<CartDTO> getAllByBillId(Long id) {
		List<CartDTO> results = new ArrayList<>();
		List<CartEntity> entities = cartRepository.findAll();
		for (CartEntity item : entities) {
			if (id == item.getBill().getId()) {
				CartDTO dto = cartConverter.toDTO(item);
				results.add(dto);
			}
		}
		return results;

	}

	@Override
	public CartDTO addCart(CartDTO cartDTO) {
		boolean check = false;
		List<CartDTO> carts = new ArrayList<>();
		carts = getAllByBillId(cartDTO.getBill_id());
		CartDTO tg = new CartDTO();
		for (CartDTO item : carts) {
			if (item.getProduct_id() == cartDTO.getProduct_id()) {
				check = true;
				tg = item;
				break;
			}
		}
		if (check == true) { // đã có sản phẩm trong giỏ
			cartDTO.setAmount(tg.getAmount() + cartDTO.getAmount());
			cartDTO.setId(tg.getId());
		 	return update(cartDTO);
		}
		return save(cartDTO);
	}
	
	
	@Override
	public CartDTO save(CartDTO dto) {
		CartEntity entity = new CartEntity();
		entity = cartConverter.toEntity(dto);
		ProductEntity productEntity = productRepository.findOne(dto.getProduct_id());
		entity.setProduct(productEntity);
		BillEntity billEntity = billRepository.findOne(dto.getBill_id());
		entity.setBill(billEntity);
		entity.setTotal(entity.getProduct().getPrice()*entity.getAmount());
		cartRepository.save(entity);
		return cartConverter.toDTO(entity);
		
	}
	
	@Override
	public CartDTO update(CartDTO dto) { 
		CartEntity entity = cartRepository.findOne(dto.getId());
		entity = cartConverter.toEntity(dto, entity);
		ProductEntity productEntity = productRepository.findOne(dto.getProduct_id());
		entity.setProduct(productEntity);
		BillEntity billEntity = billRepository.findOne(dto.getBill_id());
		entity.setBill(billEntity);
		entity.setTotal(entity.getProduct().getPrice()*entity.getAmount());
		cartRepository.save(entity);
		return cartConverter.toDTO(entity);
	}

	/*@Override
	public CartDTO save(CartDTO dto) {
		CartEntity entity;
		if (dto.getId() != null) { // đã có rồi
			entity = cartRepository.findOne(dto.getId());
			entity = cartConverter.toEntity(dto, entity);
		} else {
			entity = new CartEntity();
			entity = cartConverter.toEntity(dto);
		}
		ProductEntity productEntity = productRepository.findOne(dto.getProduct_id());
		entity.setProduct(productEntity);
		BillEntity billEntity = billRepository.findOne(dto.getBill_id());
		entity.setBill(billEntity);
		entity.setTotal(entity.getProduct().getPrice()*entity.getAmount());
		entity = cartRepository.save(entity);
		return cartConverter.toDTO(entity);

	}*/

	@Override
	public void delete(long id) {
		cartRepository.delete(id);
		;

	}

}