package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Visite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Visite entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VisiteRepository extends JpaRepository<Visite, Long> {
    @Query("select visite from Visite visite  where visite.proviseur.user.login = ?#{principal.username}")
    Page<Visite> findByUserIsCurrentUser(Pageable pageable);
}
