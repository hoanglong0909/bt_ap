package com.test.repository;

import com.test.model.Country;
import com.test.model.Province;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProvinceRepository extends JpaRepository<Province, Long> {
}
