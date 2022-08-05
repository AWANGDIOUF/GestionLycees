package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.LyceeTechnique;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the LyceeTechnique entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LyceeTechniqueRepository extends JpaRepository<LyceeTechnique, Long> {
    @Query("select lyceeTechnique from LyceeTechnique lyceeTechnique where lyceeTechnique.proviseur.user.login = ?#{principal.username}")
    Page<LyceeTechnique> findByUserIsCurrentUser(Pageable pageable);
}
