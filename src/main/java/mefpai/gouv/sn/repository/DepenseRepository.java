package mefpai.gouv.sn.repository;

import mefpai.gouv.sn.domain.Depense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Depense entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepenseRepository extends JpaRepository<Depense, Long> {
    @Query("select  depense from Depense  depense where  depense.comptableFinancier.user.login = ?#{principal.username}")
    Page<Depense> findByUserIsCurrentUser(Pageable pageable);
}
