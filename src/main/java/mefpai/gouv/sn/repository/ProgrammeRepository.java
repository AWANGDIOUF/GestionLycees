package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.Programme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Programme entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgrammeRepository extends JpaRepository<Programme, Long> {
    @Query("select programme from Programme programme where programme.directeur.user.login = ?#{principal.username}")
    Page<Programme> findByUserIsCurrentUser(Pageable pageable);
}
