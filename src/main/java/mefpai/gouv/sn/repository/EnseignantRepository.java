package mefpai.gouv.sn.repository;

import java.util.List;
import java.util.Optional;
import mefpai.gouv.sn.domain.Enseignant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Enseignant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EnseignantRepository extends JpaRepository<Enseignant, Long> {
    @Query("select enseignant from Enseignant enseignant where  enseignant.proviseur.user.login = ?#{principal.username}")
    Page<Enseignant> findByUserIsCurrentUser(Pageable pageable);
}
