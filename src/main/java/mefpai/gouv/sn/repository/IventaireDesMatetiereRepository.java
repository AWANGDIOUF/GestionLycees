package mefpai.gouv.sn.repository;

import java.util.List;
import mefpai.gouv.sn.domain.IventaireDesMatetiere;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the IventaireDesMatetiere entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IventaireDesMatetiereRepository extends JpaRepository<IventaireDesMatetiere, Long> {
    @Query(
        "select iventaireDesMatetiere from IventaireDesMatetiere iventaireDesMatetiere where iventaireDesMatetiere.comptableMatiere.user.login = ?#{principal.username}"
    )
    Page<IventaireDesMatetiere> findByUserIsCurrentUser(Pageable pageable);
}
