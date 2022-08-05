package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Besoin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Besoin entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BesoinRepository extends JpaRepository<Besoin, Long> {
    @Query("select besoin from Besoin besoin where besoin.proviseur.user.login = ?#{principal.username}")
    Page<Besoin> findByUserIsCurrentUser(Pageable pageable);
}
