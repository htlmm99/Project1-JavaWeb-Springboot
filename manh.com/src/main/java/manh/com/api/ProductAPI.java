package manh.com.api;

import org.springframework.data.domain.Pageable;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import manh.com.api.Output.ProductOutput;
import manh.com.dto.ProductDTO;
import manh.com.service.IProductService;

@CrossOrigin
@RestController
public class ProductAPI {
	@Autowired
	private IProductService productService;

	/*
	 * @GetMapping(value = "/productPage/{page}") public ProductOutput
	 * showNew(@PathVariable("page") int page) { int limit = 12; ProductOutput
	 * result = new ProductOutput(); result.setPage(page); Pageable pageable =
	 * (Pageable) new PageRequest(page - 1, limit);
	 * result.setListResult(productService.findAll(pageable));
	 * result.setTotalPage((int) Math.ceil((double) (productService.totalItem()) /
	 * limit)); return result; }
	 */

	@GetMapping(value = "/product")
	public List<ProductDTO> getAllProducts() {
		return productService.getAll();
	}

	@GetMapping(value = "/product/{id}")
	public ProductDTO getOneProduct(@PathVariable("id") Long id) {
		return productService.findOneById(id);
	}

	@GetMapping(value = "/productType/{type}")
	public List<ProductDTO> getOneProduct(@PathVariable("type") String type) {
		return productService.findProductsByType(type);
	}

	@GetMapping(value = "/productSearch/{name}")
	public List<ProductDTO> findProductsByName(@PathVariable("name") String name) {
		return productService.findByName(name);
	}

	@PostMapping(value = "/product")
	public ProductDTO createProduct(@RequestBody ProductDTO model) {
		return productService.save(model);
	}

	@PutMapping(value = "/product/{id}")
	public ProductDTO updateProduct(@RequestBody ProductDTO model, @PathVariable("id") Long id) {
		model.setId(id);
		return productService.save(model);
	}

	@DeleteMapping(value = "/product/{id}")
	public void deleteProduct(@PathVariable("id") Long id) {
		productService.delete(id);
	}
}
