package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.NiveauxCalification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NiveauxCalification entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveauxCalificationRepository extends JpaRepository<NiveauxCalification, Long> {
    @Query(
        "select niveauxCalification from NiveauxCalification niveauxCalification where niveauxCalification.directeur.user.login = ?#{principal.username}"
    )
    Page<NiveauxCalification> findByUserIsCurrentUser(Pageable pageable);
}
