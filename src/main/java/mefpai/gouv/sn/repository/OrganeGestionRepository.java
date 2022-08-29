package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.OrganeGestion;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the OrganeGestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrganeGestionRepository extends JpaRepository<OrganeGestion, Long> {
    @Query("select organeGestion from OrganeGestion organeGestion where organeGestion.proviseur.user.login = ?#{principal.username}")
    Page<OrganeGestion> findByUserIsCurrentUser(Pageable pageable);
}
