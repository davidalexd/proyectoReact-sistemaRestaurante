package com.restaurant.api.models;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "Message")
public class Message implements Serializable{

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_message")
	private Long idMessage;
	
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	private Chat chat;
	
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	private User user;
	
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
	private OrderUser orderUser;
	
	@Column(name = "message")
	private String message;
	
	@Column(name = "state")
	private boolean state;
	
	public Message(Chat chat, User user, OrderUser orderUser, String message, boolean state) {
		super();
		this.chat = chat;
		this.user = user;
		this.orderUser = orderUser;
		this.message = message;
		this.state = state;
	}
	public Message() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getIdMessage() {
		return idMessage;
	}
	public Chat getChat() {
		return chat;
	}
	public User getUser() {
		return user;
	}
	public OrderUser getOrderUser() {
		return orderUser;
	}
	public String getMessage() {
		return message;
	}
	public boolean isState() {
		return state;
	}
	public void setIdMessage(Long idMessage) {
		this.idMessage = idMessage;
	}
	public void setChat(Chat chat) {
		this.chat = chat;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public void setOrderUser(OrderUser orderUser) {
		this.orderUser = orderUser;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public void setState(boolean state) {
		this.state = state;
	}
	
	private static final long serialVersionUID = -4481438056464980767L;
}
