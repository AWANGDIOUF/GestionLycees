package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Difficulte;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Difficulte entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DifficulteRepository extends JpaRepository<Difficulte, Long> {
    @Query("select difficulte from  Difficulte  difficulte where  difficulte.proviseur.user.login = ?#{principal.username}")
    Page<Difficulte> findByUserIsCurrentUser(Pageable pageable);
}
