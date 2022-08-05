package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Recette;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Recette entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecetteRepository extends JpaRepository<Recette, Long> {
    @Query("select recette from Recette recette where recette.comptableFinancier.user.login = ?#{principal.username}")
    Page<Recette> findByUserIsCurrentUser(Pageable pageable);
}
