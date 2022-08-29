package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import mefpai.gouv.sn.domain.MouvementMatiere;
import mefpai.gouv.sn.repository.MouvementMatiereRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.MouvementMatiereService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.MouvementMatiere}.
 */
@RestController
@RequestMapping("/api")
public class MouvementMatiereResource {

    private final Logger log = LoggerFactory.getLogger(MouvementMatiereResource.class);

    private static final String ENTITY_NAME = "mouvementMatiere";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MouvementMatiereService mouvementMatiereService;

    private final MouvementMatiereRepository mouvementMatiereRepository;

    public MouvementMatiereResource(
        MouvementMatiereService mouvementMatiereService,
        MouvementMatiereRepository mouvementMatiereRepository
    ) {
        this.mouvementMatiereService = mouvementMatiereService;
        this.mouvementMatiereRepository = mouvementMatiereRepository;
    }

    /**
     * {@code POST  /mouvement-matieres} : Create a new mouvementMatiere.
     *
     * @param mouvementMatiere the mouvementMatiere to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mouvementMatiere, or with status {@code 400 (Bad Request)} if the mouvementMatiere has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mouvement-matieres")
    public ResponseEntity<MouvementMatiere> createMouvementMatiere(@RequestBody MouvementMatiere mouvementMatiere)
        throws URISyntaxException {
        log.debug("REST request to save MouvementMatiere : {}", mouvementMatiere);
        if (mouvementMatiere.getId() != null) {
            throw new BadRequestAlertException("A new mouvementMatiere cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MouvementMatiere result = mouvementMatiereService.save(mouvementMatiere);
        return ResponseEntity
            .created(new URI("/api/mouvement-matieres/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mouvement-matieres/:id} : Updates an existing mouvementMatiere.
     *
     * @param id the id of the mouvementMatiere to save.
     * @param mouvementMatiere the mouvementMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mouvementMatiere,
     * or with status {@code 400 (Bad Request)} if the mouvementMatiere is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mouvementMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mouvement-matieres/{id}")
    public ResponseEntity<MouvementMatiere> updateMouvementMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MouvementMatiere mouvementMatiere
    ) throws URISyntaxException {
        log.debug("REST request to update MouvementMatiere : {}, {}", id, mouvementMatiere);
        if (mouvementMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mouvementMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mouvementMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        MouvementMatiere result = mouvementMatiereService.save(mouvementMatiere);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, mouvementMatiere.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /mouvement-matieres/:id} : Partial updates given fields of an existing mouvementMatiere, field will ignore if it is null
     *
     * @param id the id of the mouvementMatiere to save.
     * @param mouvementMatiere the mouvementMatiere to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mouvementMatiere,
     * or with status {@code 400 (Bad Request)} if the mouvementMatiere is not valid,
     * or with status {@code 404 (Not Found)} if the mouvementMatiere is not found,
     * or with status {@code 500 (Internal Server Error)} if the mouvementMatiere couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/mouvement-matieres/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<MouvementMatiere> partialUpdateMouvementMatiere(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MouvementMatiere mouvementMatiere
    ) throws URISyntaxException {
        log.debug("REST request to partial update MouvementMatiere partially : {}, {}", id, mouvementMatiere);
        if (mouvementMatiere.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, mouvementMatiere.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!mouvementMatiereRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MouvementMatiere> result = mouvementMatiereService.partialUpdate(mouvementMatiere);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, mouvementMatiere.getId().toString())
        );
    }

    /**
     * {@code GET  /mouvement-matieres} : get all the mouvementMatieres.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mouvementMatieres in body.
     */
    @GetMapping("/mouvement-matieres")
    public ResponseEntity<List<MouvementMatiere>> getAllMouvementMatieres(Pageable pageable) {
        log.debug("REST request to get a page of MouvementMatieres");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<MouvementMatiere> page = mouvementMatiereService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (mouvementMatiereService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((mouvementMatiereRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /mouvement-matieres/:id} : get the "id" mouvementMatiere.
     *
     * @param id the id of the mouvementMatiere to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mouvementMatiere, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mouvement-matieres/{id}")
    public ResponseEntity<MouvementMatiere> getMouvementMatiere(@PathVariable Long id) {
        log.debug("REST request to get MouvementMatiere : {}", id);
        Optional<MouvementMatiere> mouvementMatiere = mouvementMatiereService.findOne(id);
        return ResponseUtil.wrapOrNotFound(mouvementMatiere);
    }

    /**
     * {@code DELETE  /mouvement-matieres/:id} : delete the "id" mouvementMatiere.
     *
     * @param id the id of the mouvementMatiere to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mouvement-matieres/{id}")
    public ResponseEntity<Void> deleteMouvementMatiere(@PathVariable Long id) {
        log.debug("REST request to delete MouvementMatiere : {}", id);
        mouvementMatiereService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
