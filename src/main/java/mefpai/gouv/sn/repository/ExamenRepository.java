package mefpai.gouv.sn.repository;

import java.util.List;
import java.util.Optional;
import mefpai.gouv.sn.domain.Examen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Examen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamenRepository extends JpaRepository<Examen, Long> {
    @Query("select examen from Examen examen where examen.directeur.user.login = ?#{principal.username}")
    Page<Examen> findByUserIsCurrentUser(Pageable pageable);
}
