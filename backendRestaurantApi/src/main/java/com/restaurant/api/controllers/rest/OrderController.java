package com.restaurant.api.controllers.rest;

import com.restaurant.api.dto.request.UpdateStatus;
import com.restaurant.api.dto.response.MostOrdered;
import com.restaurant.api.dto.response.OrderReport;
import com.restaurant.api.dto.response.SummaryReport;
import com.restaurant.api.utils.SummaryUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import com.restaurant.api.models.OrderDetail;
import com.restaurant.api.models.OrderUser;
import com.restaurant.api.models.Payment;
import com.restaurant.api.models.PaymentMethod;
import com.restaurant.api.models.Product;
import com.restaurant.api.models.User;
import com.restaurant.api.dto.request.OrderDetailRequest;
import com.restaurant.api.dto.request.OrderRequest;
import com.restaurant.api.repositories.OrderDetailRepository;
import com.restaurant.api.repositories.OrderRepository;
import com.restaurant.api.repositories.PaymentMethodRepository;
import com.restaurant.api.repositories.PaymentRepository;
import com.restaurant.api.repositories.UserRepository;
import com.restaurant.api.service.ProductService;


import java.util.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/order")
public class OrderController {
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private PaymentMethodRepository paymentMethodRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	@GetMapping
	public List<OrderUser> getAll() {
		return orderRepository.findAll();
	}
	@GetMapping(value = "/{id}")
	public List<OrderUser> getAllById(@PathVariable("id")Long id){
		List<Long> ids = new ArrayList<>();
		ids.add(id);
		return orderRepository.findAllById(ids);
	}
	@GetMapping(value = "/users/{id}")
	public List<OrderUser> getOrderByUserId(@PathVariable("id")Long id){
		List<OrderUser> ordersUser= orderRepository.getOrdersByUserId(id);
		return ordersUser;
	}
	
	@PostMapping
	public OrderUser create(@RequestBody OrderRequest orderRequest) {
		User user = userRepository.findById(orderRequest.getIduser()).get();
		PaymentMethod method = paymentMethodRepository.findById(orderRequest.getPayment_method()).get();
		System.out.println(method.getNamePaymentMethod());
		String status = orderRequest.getStatus();
		Long total = orderRequest.getSubtotal();
		List<OrderDetailRequest> items = orderRequest.getOrders();
		Set<OrderDetail> orderDetails = new HashSet<>();
		OrderUser order = new OrderUser(user,status,"desc",total);
		OrderUser createdOrder = orderRepository.save(order);
		for (OrderDetailRequest orderDetailRequest : items) {
			Product product = productService.findProductById(orderDetailRequest.getIdproduct());
			OrderDetail orderDetail = new OrderDetail(product,createdOrder,orderDetailRequest.getQuantity());
			OrderDetail createdOrderDetail = orderDetailRepository.save(orderDetail);
			orderDetails.add(createdOrderDetail);
		}
		Payment payment = new Payment(order, method, true);
		Set<Payment> payList = new HashSet<Payment>();
		payList.add(payment);
		paymentRepository.save(payment);
		createdOrder.setOrderDetails(orderDetails);
		createdOrder.setPayment(payList);
		return createdOrder;
	}

	@PatchMapping("/{id}/status")
	public OrderUser updateStatus(@PathVariable(value = "id")Long id, @RequestBody UpdateStatus status){
		OrderUser orderUser = orderRepository.findById(id).get();
		orderUser.setStatusOrder(status.getStatus());
		OrderUser orderSaved = orderRepository.save(orderUser);
		return orderSaved;
	}

	@GetMapping("/mostOrdered")
	public List<MostOrdered> getOrdersPerDay(@RequestParam(value="days", required = false)Integer days){
		Calendar today = Calendar.getInstance();
		today.add(Calendar.DATE, 1);;
		Calendar range = Calendar.getInstance();
		if(days !=null){
			range.add(Calendar.DATE,-days);
		}
		System.out.println("Range " +range.getTime());
		System.out.println("Tomorrow " + today.getTime());
		List<List<Object>> result =orderRepository.getMostOrdered(range.getTime(),today.getTime());
		List<MostOrdered> response = new ArrayList<>();
		result.forEach(e ->{
			response.add( new MostOrdered((Product)e.get(0),Long.parseLong(e.get(1).toString())));
		});
		return response;
	}

	@GetMapping("/orderReport")
	public List<OrderReport> getOrderReport(@RequestParam(value="days", required = false)Integer days){
		Calendar today = Calendar.getInstance();
		Calendar range = Calendar.getInstance();
		range.add(Calendar.DATE,-1);
		if(days !=null){
			range.add(Calendar.DATE,-days);
		}
		List<OrderReport> orderReports = new ArrayList<>();
		List<List<Object>> result = orderRepository.getOrderReport(range.getTime(),today.getTime());
		result.forEach(e -> {
			orderReports.add(new OrderReport(
					(User)e.get(0),
					e.get(1).toString(),
					Long.parseLong(e.get(2).toString()),
					e.get(3).toString()
			));
		});
		return orderReports;
	}

	@GetMapping("/summary")
	public SummaryReport getTotalOrder(@RequestParam(value = "type",required = false) String type,
							  @RequestParam(value = "range",required = false) Integer range ){
		Long currentTotalOrder =orderRepository.getTotalSummaryReport(
				SummaryUtils.getDates("DAY",true).get(1),
				SummaryUtils.getDates("DAY",true).get(0));
		Long lastTotalOrder = orderRepository.getTotalSummaryReport(
				SummaryUtils.getDates("DAY",false).get(1),
				SummaryUtils.getDates("DAY",false).get(0));

		SummaryReport summary = new SummaryReport(
				SummaryUtils.checkIfIsNull(currentTotalOrder),
				SummaryUtils.checkIfIsNull(lastTotalOrder),
				"total");
		return summary;
	}





}
