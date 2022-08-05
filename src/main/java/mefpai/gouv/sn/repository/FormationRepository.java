package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Formation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Formation entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FormationRepository extends JpaRepository<Formation, Long> {
    @Query("select formation from Formation formation where formation.directeur.user.login = ?#{principal.username}")
    Page<Formation> findByUserIsCurrentUser(Pageable pageable);
}
