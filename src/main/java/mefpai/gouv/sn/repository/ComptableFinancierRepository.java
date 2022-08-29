package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.ComptableFinancier;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ComptableFinancier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComptableFinancierRepository extends JpaRepository<ComptableFinancier, Long> {}
