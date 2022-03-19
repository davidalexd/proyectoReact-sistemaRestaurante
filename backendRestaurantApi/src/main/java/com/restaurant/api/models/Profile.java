package com.restaurant.api.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "profile")
@Data
public class Profile implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_profile")

    private Long idProfile;

    @OneToOne(mappedBy = "profile")
    @JsonIgnore
    private User user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @JsonIgnore
    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

}
