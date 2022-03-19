package com.restaurant.api.models;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "chat")
public class Chat implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_chat")
	private int idChat;
	
	@Column(name = "chat_name")
	private String chatName;
	
	@ManyToMany(cascade = {CascadeType.ALL})
	@JoinTable(
			name = "participants",
			joinColumns = @JoinColumn(name = "id_chat"),
			inverseJoinColumns =  @JoinColumn(name = "id_user"))
	private List<User> users;
	
	@OneToMany(cascade = CascadeType.ALL,mappedBy = "chat")
	private List<Message> messages;
	
	
	public Chat() {
		super();
	}
	public Chat(String chatName, List<User> users) {
		super();
		this.chatName = chatName;
		this.users = users;
	}
	public int getIdChat() {
		return idChat;
	}
	public String getChatName() {
		return chatName;
	}
	public List<User> getUsers() {
		return users;
	}
	public void setIdChat(int idChat) {
		this.idChat = idChat;
	}
	public void setChatName(String chatName) {
		this.chatName = chatName;
	}
	public void setUsers(List<User> users) {
		this.users = users;
	}
	
	private static final long serialVersionUID = -3118606318700956600L;
	
	
	
}
