package manh.com.service.Impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import manh.com.converter.BillConverter;
import manh.com.dto.BillDTO;
import manh.com.entity.BillEntity;
import manh.com.repository.BillRepository;
import manh.com.service.IBillService;

@Service
public class BillService implements IBillService {
	@Autowired
	public BillRepository billRepository;
	@Autowired
	public BillConverter billConverter;
	
	@Override
	public 	List<BillDTO> getAll(){
		List<BillDTO> results = new ArrayList<>();
		List<BillEntity> entities = billRepository.findAll();
		for (BillEntity item : entities) {
			BillDTO dto = billConverter.toDTO(item);
			if(dto.getId().intValue() > -1)
			{
			results.add(dto);
			}
		}
		return results;

	}
	
	@Override
	public BillDTO getOneById(Long id) {
		BillDTO billDTO = new BillDTO();
		BillEntity billEntity = billRepository.getOne(id);
		billDTO = billConverter.toDTO(billEntity);
		return billDTO;
		
	}
	
	@Override
	public BillDTO save(BillDTO dto) {
		BillEntity entity = new BillEntity();
		if (dto.getId() != null) {
			BillEntity oldEntity = billRepository.findOne(dto.getId());
			entity = billConverter.toEntity(dto, oldEntity);
		} else {
			entity = billConverter.toEntity(dto);
		}
		entity = billRepository.save(entity);
		return billConverter.toDTO(entity);

	}

	@Override
	public void delete(long id) {
		billRepository.delete(id);

	}

}
