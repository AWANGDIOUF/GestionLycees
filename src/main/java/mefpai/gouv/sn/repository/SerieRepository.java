package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Serie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Serie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SerieRepository extends JpaRepository<Serie, Long> {
    @Query("select serie from Serie serie where serie.directeur.user.login = ?#{principal.username}")
    Page<Serie> findByUserIsCurrentUser(Pageable pageable);
}
