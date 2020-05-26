package manh.com.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import manh.com.dto.CartDTO;
import manh.com.service.ICartService;


@CrossOrigin
@RestController
public class CartAPI {
	@Autowired
	private ICartService cartService;
	
	@GetMapping(value = "/cart")
	public List<CartDTO> getAllCarts(){
		return cartService.getAll();
	}

	/*@GetMapping(value = "/cart/{id}")
	public CartDTO getOneCart(@PathVariable("id") Long id) {
		return cartService.getOneById(id);
	}*/
	
	@GetMapping(value = "/cart/{id}")
	public List<CartDTO> getAllCartByBillId(@PathVariable("id") Long bill_id) {
		return cartService.getAllByBillId(bill_id);
	}

	@PostMapping(value = "/cart")
	public CartDTO createCart(@RequestBody CartDTO model) {
		return cartService.addCart(model);
	}

	@PutMapping(value = "/cart/{id}")
	public CartDTO updateCart(@RequestBody CartDTO model, @PathVariable("id") Long id) {
		model.setId(id);
		return cartService.update(model);
	}

	@DeleteMapping(value = "/cart/{id}")
	public void deleteCart(@PathVariable("id") Long id) {
		cartService.delete(id);
	}
}

