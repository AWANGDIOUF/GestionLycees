package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.MouvementMatiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the MouvementMatiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MouvementMatiereRepository extends JpaRepository<MouvementMatiere, Long> {
    @Query(
        "select mouvementMatiere from MouvementMatiere mouvementMatiere where mouvementMatiere.comptableMatiere.user.login = ?#{principal.username}"
    )
    Page<MouvementMatiere> findByUserIsCurrentUser(Pageable pageable);
}
