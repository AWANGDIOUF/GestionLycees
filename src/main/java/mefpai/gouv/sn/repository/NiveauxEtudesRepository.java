package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.NiveauxEtudes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the NiveauxEtudes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NiveauxEtudesRepository extends JpaRepository<NiveauxEtudes, Long> {
    @Query("select niveauxEtudes from NiveauxEtudes niveauxEtudes where niveauxEtudes.directeur.user.login = ?#{principal.username}")
    Page<NiveauxEtudes> findByUserIsCurrentUser(Pageable pageable);
}
