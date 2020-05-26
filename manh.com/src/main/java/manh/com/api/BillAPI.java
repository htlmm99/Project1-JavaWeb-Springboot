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

import manh.com.dto.BillDTO;
import manh.com.service.IBillService;

@CrossOrigin
@RestController
public class BillAPI {
	@Autowired
	private IBillService billService;
	
	@GetMapping(value = "/bill")
	public List<BillDTO> getAllProducts(){
		return billService.getAll();
	}

	@GetMapping(value = "/bill/{id}")
	public BillDTO getOneProduct(@PathVariable("id") Long id) {
		return billService.getOneById(id);
	}

	@PostMapping(value = "/bill")
	public BillDTO createProduct(@RequestBody BillDTO model) {
		return billService.save(model);
	}

	@PutMapping(value = "/bill/{id}")
	public BillDTO updateProduct(@RequestBody BillDTO model, @PathVariable("id") Long id) {
		model.setId(id);
		return billService.save(model);
	}

	@DeleteMapping(value = "/bill/{id}")
	public void deleteProduct(@PathVariable("id") Long id) {
		billService.delete(id);
	}

}
