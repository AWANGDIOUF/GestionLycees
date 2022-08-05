package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Salle;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Salle entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SalleRepository extends JpaRepository<Salle, Long> {
    @Query("select salle from Salle salle where salle.directeur.user.login = ?#{principal.username}")
    Page<Salle> findByUserIsCurrentUser(Pageable pageable);
}
