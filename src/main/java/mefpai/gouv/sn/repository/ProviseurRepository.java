package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.Proviseur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Proviseur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProviseurRepository extends JpaRepository<Proviseur, Long> {}
