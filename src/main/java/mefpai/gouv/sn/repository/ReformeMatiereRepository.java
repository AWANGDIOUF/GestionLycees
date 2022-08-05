package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.ReformeMatiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ReformeMatiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReformeMatiereRepository extends JpaRepository<ReformeMatiere, Long> {
    @Query(
        "select reformeMatiere from ReformeMatiere reformeMatiere where reformeMatiere.comptableMatiere.user.login = ?#{principal.username}"
    )
    Page<ReformeMatiere> findByUserIsCurrentUser(Pageable pageable);
}
