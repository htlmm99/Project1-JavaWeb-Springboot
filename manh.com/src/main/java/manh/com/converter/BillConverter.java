package manh.com.converter;

import org.springframework.stereotype.Component;

import manh.com.dto.BillDTO;
import manh.com.entity.BillEntity;

@Component
public class BillConverter {
	public BillEntity toEntity(BillDTO billDTO)
	{
		BillEntity billEntity = new BillEntity();
		billEntity.setFullName(billDTO.getFullName());
		billEntity.setEmail(billDTO.getEmail());
		billEntity.setPhone(billDTO.getPhone());
		billEntity.setAddress(billDTO.getAddress());
		billEntity.setNote(billDTO.getNote());
		billEntity.setTotal(billDTO.getTotal());
		billEntity.setCreatedDate(billDTO.getCreatedDate());

		return billEntity;
	}
	
	public BillEntity toEntity(BillDTO billDTO, BillEntity billEntity)
	{
		billEntity.setFullName(billDTO.getFullName());
		billEntity.setEmail(billDTO.getEmail());
		billEntity.setPhone(billDTO.getPhone());
		billEntity.setAddress(billDTO.getAddress());
		billEntity.setNote(billDTO.getNote());
		billEntity.setTotal(billDTO.getTotal());
		billEntity.setCreatedDate(billDTO.getCreatedDate());

		return billEntity;
	}
	
	public BillDTO toDTO(BillEntity billEntity)
	{
		BillDTO billDTO = new BillDTO();
		if(billEntity.getId() != null)
		{
			billDTO.setId(billEntity.getId());
		}
		billDTO.setFullName(billEntity.getFullName());
		billDTO.setEmail(billEntity.getEmail());
		billDTO.setPhone(billEntity.getPhone());
		billDTO.setAddress(billEntity.getAddress());
		billDTO.setNote(billEntity.getNote());
		billDTO.setTotal(billEntity.getTotal());
		billDTO.setCreatedDate(billEntity.getCreatedDate());
		return billDTO;
	}
}
