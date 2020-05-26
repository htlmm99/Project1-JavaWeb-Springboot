package manh.com.service;

import java.util.List;

import manh.com.dto.BillDTO;

public interface IBillService {
	BillDTO save(BillDTO billDTO);
	void delete(long id);
	BillDTO getOneById(Long id);
	List<BillDTO> getAll();

}
