package mefpai.gouv.sn.repository;

import java.util.List;
import java.util.Optional;
import mefpai.gouv.sn.domain.Apprenant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Apprenant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ApprenantRepository extends JpaRepository<Apprenant, Long> {
    @Query("select apprenant from Apprenant  apprenant where apprenant.directeur.user.login = ?#{principal.username}")
    Page<Apprenant> findByUserIsCurrentUser(Pageable pageable);
}
