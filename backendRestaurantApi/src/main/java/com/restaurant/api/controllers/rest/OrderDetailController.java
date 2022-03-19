package com.restaurant.api.controllers.rest;

import java.util.ArrayList;
import java.util.List;

import com.restaurant.api.dto.response.SummaryReport;
import com.restaurant.api.utils.SummaryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.restaurant.api.models.OrderDetail;
import com.restaurant.api.repositories.OrderDetailRepository;

@RestController
@CrossOrigin
@RequestMapping(value = "api/orderdetails")

public class OrderDetailController {

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	
	@GetMapping(value = "/{id}")
	public List<OrderDetail> getAll(@PathVariable("id")Long id){
		List<Long> ids = new ArrayList<Long>();
		ids.add(id);
		
		return orderDetailRepository.findAllById(ids);
	}
	@GetMapping(value = "/summary")
	@ResponseBody
	public SummaryReport getReport(){

		Long quantity= orderDetailRepository.quantity(
				SummaryUtils.getDates("DAY",true).get(1),
				SummaryUtils.getDates("DAY",true).get(0)
		);
		Long lastQuantity= orderDetailRepository.quantity(
				SummaryUtils.getDates("DAY",false).get(1),
				SummaryUtils.getDates("DAY",false).get(0)
		);
		SummaryReport summary = new SummaryReport(
				SummaryUtils.checkIfIsNull(quantity),
				SummaryUtils.checkIfIsNull(lastQuantity),
				"dishes"
		);
		return summary;
	}
	
}
