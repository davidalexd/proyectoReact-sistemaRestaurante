package com.restaurant.api.configuration;

import java.util.Properties;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class HibernateConfiguration {
	
	@Bean(name = "entityManagerFactory")
	public LocalSessionFactoryBean sessionFactory() {
		LocalSessionFactoryBean session= new LocalSessionFactoryBean();
		session.setPackagesToScan("com.restaurant.api.models");
		session.setDataSource(dataSource());
		session.setHibernateProperties(hibernateProperties());
		return session;
	}
	
	@Bean
	public DataSource dataSource() {
		
		DriverManagerDataSource driverDataSource = new DriverManagerDataSource();
		driverDataSource.setDriverClassName("com.mysql.jdbc.Driver");
		/*driverDataSource.setUsername("root");
		driverDataSource.setPassword("");
		driverDataSource.setUrl("jdbc:mysql://localhost:3306/delibakery");*/
		driverDataSource.setUsername("bd0744e00e65f9");
		driverDataSource.setPassword("3a9de651");
		driverDataSource.setUrl("jdbc:mysql://us-cdbr-east-04.cleardb.com/heroku_adc647a2419265a");
		return driverDataSource;
	}
	public Properties hibernateProperties() {
		Properties properties = new Properties();
		properties.setProperty("hibernate.dialect","org.hibernate.dialect.MySQLDialect");
		
		return properties;
	}
	
	@Autowired
	@Bean(name = "transactionManager")
	public HibernateTransactionManager hibernateTransaction() {
		HibernateTransactionManager hibernateTransactionManager = new HibernateTransactionManager();
		hibernateTransactionManager.setSessionFactory(sessionFactory().getObject());
		return hibernateTransactionManager;
	}
	
}
