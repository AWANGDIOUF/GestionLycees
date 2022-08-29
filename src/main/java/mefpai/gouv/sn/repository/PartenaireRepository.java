package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Partenaire;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Partenaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PartenaireRepository extends JpaRepository<Partenaire, Long> {
    @Query("select partenaire from Partenaire partenaire where partenaire.proviseur.user.login = ?#{principal.username}")
    Page<Partenaire> findByUserIsCurrentUser(Pageable pageable);
}
