package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Reception;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Reception entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReceptionRepository extends JpaRepository<Reception, Long> {
    @Query("select reception from Reception reception where reception.comptableMatiere.user.login = ?#{principal.username}")
    Page<Reception> findByUserIsCurrentUser(Pageable pageable);
}
